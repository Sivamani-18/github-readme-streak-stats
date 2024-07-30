// src/components/ContributionCard.tsx
import React from 'react';
import { getRequestedTheme } from '@/utils/themeUtils';
import {
  ContributionsData,
  getContributionStats,
} from '@/utils/contributionUtils';

type ContributionCardProps = {
  data: ContributionsData;
  params: Record<string, string>;
};

const ContributionCard: React.FC<ContributionCardProps> = ({
  data,
  params,
}) => {
  const theme = getRequestedTheme(params);
  const locale = params.locale ?? 'en';

  const stats = getContributionStats(data);

  console.log('stats', stats);

  return (
    <div style={{ background: theme.background, color: theme.text }}>
      <h2>Total Contributions: {stats.totalContributions}</h2>
      <h2>Current Streak: {stats.currentStreak.length}</h2>
      <h2>Longest Streak: {stats.longestStreak.length}</h2>
      {/* <h2>First Contribution: {stats.firstContribution}</h2> */}
    </div>
  );
};

export default ContributionCard;
