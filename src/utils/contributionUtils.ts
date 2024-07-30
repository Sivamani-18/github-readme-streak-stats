// src/utils/contributionUtils.ts
export type ContributionDay = {
  contributionCount: number;
  date: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type ContributionsCollection = {
  contributionYears: number[];
  contributionCalendar: {
    weeks: ContributionWeek[];
  };
};

export type UserData = {
  createdAt: string;
  contributionsCollection: ContributionsCollection;
};

export type ContributionsData = {
  [year: string]: {
    user: UserData;
  };
};

export type ContributionStats = {
  totalContributions: number;
  currentStreak: Streak;
  longestStreak: Streak;
  firstContribution: string;
};

export type Streak = {
  start: string;
  end: string;
  length: number;
};

const calculateStreaks = (
  contributions: { date: string; count: number }[]
): { currentStreak: Streak; longestStreak: Streak } => {
  let currentStreak: Streak = { start: '', end: '', length: 0 };
  let longestStreak: Streak = { start: '', end: '', length: 0 };
  let tempStreak: Streak = { start: '', end: '', length: 0 };

  const currentDate = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  currentStreak.start = yesterday;
  currentStreak.end = currentDate;
  currentStreak.length = calculateDaysBetween(yesterday, currentDate);

  contributions.forEach((day) => {
    if (day.count > 0) {
      if (tempStreak.length === 0) {
        tempStreak.start = day.date;
      }
      tempStreak.end = day.date;
      tempStreak.length++;
    } else {
      if (tempStreak.length > longestStreak.length) {
        longestStreak = { ...tempStreak };
      }
      tempStreak = { start: '', end: '', length: 0 };
    }
  });

  if (tempStreak.length > longestStreak.length) {
    longestStreak = { ...tempStreak };
  }

  return { currentStreak, longestStreak };
};

const calculateDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDiff = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getContributionStats = (
  data: ContributionsData
): ContributionStats => {
  console.log('getContributionStats-------->', data);

  let totalContributions = 0;
  let allContributions: { date: string; count: number }[] = [];
  let firstContribution = '';

  Object.values(data).forEach((yearData) => {
    const contributionsCollection = yearData.user.contributionsCollection;

    const contributions =
      contributionsCollection.contributionCalendar.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );

    totalContributions += contributions.reduce(
      (total, day) => total + day.count,
      0
    );
    allContributions = [...allContributions, ...contributions];

    const firstYearContribution = contributions.find(
      (day) => day.count > 0
    )?.date;
    if (
      firstYearContribution &&
      (!firstContribution || firstYearContribution < firstContribution)
    ) {
      firstContribution = firstYearContribution;
    }
  });

  const currentDate = new Date().toISOString().split('T')[0];
  const longestStreak = {
    start: firstContribution,
    end: currentDate,
    length: calculateDaysBetween(firstContribution, currentDate),
  };

  const streaks = calculateStreaks(allContributions);

  return {
    totalContributions,
    currentStreak: streaks.currentStreak,
    longestStreak,
    firstContribution,
  };
};
