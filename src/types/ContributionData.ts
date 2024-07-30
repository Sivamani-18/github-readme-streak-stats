// src/types/ContributionData.ts
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
