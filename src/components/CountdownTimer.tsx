import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current time in Filipino timezone (Asia/Manila, UTC+8)
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      
      const parts = formatter.formatToParts(now);
      const year = parseInt(parts.find(p => p.type === 'year')!.value);
      const month = parseInt(parts.find(p => p.type === 'month')!.value);
      const day = parseInt(parts.find(p => p.type === 'day')!.value);
      const hour = parseInt(parts.find(p => p.type === 'hour')!.value);
      const minute = parseInt(parts.find(p => p.type === 'minute')!.value);
      const second = parseInt(parts.find(p => p.type === 'second')!.value);
      
      // Target date: January 1, 2026 at midnight in Filipino timezone (UTC+8)
      const targetYear = 2026;
      const targetMonth = 1;
      const targetDay = 1;
      const targetHour = 0;
      const targetMinute = 0;
      const targetSecond = 0;
      
      // Compare Philippines time components directly
      const isPastTarget = 
        year > targetYear ||
        (year === targetYear && month > targetMonth) ||
        (year === targetYear && month === targetMonth && day > targetDay) ||
        (year === targetYear && month === targetMonth && day === targetDay && hour > targetHour) ||
        (year === targetYear && month === targetMonth && day === targetDay && hour === targetHour && minute > targetMinute) ||
        (year === targetYear && month === targetMonth && day === targetDay && hour === targetHour && minute === targetMinute && second >= targetSecond);
      
      if (isPastTarget) {
        setIsNewYear(true);
        // Set all values to zero when past the target date
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      // Calculate difference in milliseconds
      // Convert Philippines time to UTC for accurate calculation
      // Philippines is UTC+8, so subtract 8 hours
      const phNowUTC = Date.UTC(year, month - 1, day, hour, minute, second) - (8 * 60 * 60 * 1000);
      const phNewYearUTC = Date.UTC(targetYear, targetMonth - 1, targetDay, targetHour, targetMinute, targetSecond) - (8 * 60 * 60 * 1000);
      
      const difference = phNewYearUTC - phNowUTC;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center group">
      <div className="relative">
        <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[90px] group-hover:border-primary/60 group-hover:glow transition-all duration-300">
          <span className="font-display text-3xl md:text-5xl text-foreground tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-pulse-soft" />
      </div>
      <span className="font-body text-xs md:text-sm text-muted-foreground mt-2 tracking-wider uppercase">
        {label}
      </span>
    </div>
  );

  return (
    <div className="text-center">
      {isNewYear && (
        <>
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-gold animate-pulse" />
            <span className="font-display text-4xl md:text-6xl text-gradient">
              Happy New Year!
            </span>
            <Sparkles className="w-6 h-6 text-gold animate-pulse" />
          </div>
          <p className="font-body text-foreground text-lg mb-8">
            Our new chapter begins now! 💕
          </p>
        </>
      )}
      
      {!isNewYear && (
        <p className="font-body text-gold text-sm tracking-[0.3em] uppercase mb-6">
          Counting Down To Our New Beginning
        </p>
      )}
      
      <div className="flex items-center justify-center gap-2 md:gap-4">
        <TimeBlock value={timeLeft.days} label="Days" />
        <span className="font-display text-3xl text-primary animate-pulse">:</span>
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <span className="font-display text-3xl text-primary animate-pulse">:</span>
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <span className="font-display text-3xl text-primary animate-pulse">:</span>
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export default CountdownTimer;
