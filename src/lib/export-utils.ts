import { surveyResponses, insights, personaRankings, questionAnalytics } from './mock-survey-data';

// Helper to format date for filenames
const getFormattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// Generate CSV content
export const generateCSV = (data: any[], headers: string[]) => {
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] ?? '')
      ).join(',')
    )
  ].join('\n');
  return csvContent;
};

// Generate full business report in markdown format
export const generateBusinessReport = () => {
  const report = `# PersnaSync Business Report - ${getFormattedDate()}

## Overview
Total Responses: ${surveyResponses.length}
Average XP Gained: ${Math.round(surveyResponses.reduce((acc, curr) => acc + curr.xpGained, 0) / surveyResponses.length)}

## Key Insights
${insights.map(insight => `- ${insight.title}\n  ${insight.description}`).join('\n')}

## Customer Personas
${personaRankings.map(p => `${p.rank}. ${p.emoji} ${p.persona} - ${p.percentage}% market share`).join('\n')}

## Question Analytics
${questionAnalytics.map(qa => `
### ${qa.question}
${qa.distribution.map(d => `- ${d.response}: ${d.percentage}%`).join('\n')}
`).join('\n')}
`;

  return report;
};

// Export business report as PDF
export const exportBusinessReport = async () => {
  const report = generateBusinessReport();
  const blob = new Blob([report], { type: 'text/markdown' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `persnasync-business-report-${getFormattedDate()}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Export analytics data as CSV
export const exportAnalyticsData = () => {
  const headers = ['id', 'timestamp', 'xpGained', 'completionTime', 'persona'];
  const csvContent = generateCSV(surveyResponses, headers);
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `persnasync-analytics-${getFormattedDate()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Share insights via clipboard
export const shareInsights = async () => {
  const shareText = `PersnaSync Insights - ${getFormattedDate()}\n\n${insights.map(insight => `• ${insight}`).join('\n')}`;
  
  try {
    await navigator.clipboard.writeText(shareText);
    return true;
  } catch (err) {
    console.error('Failed to copy insights:', err);
    return false;
  }
}; 