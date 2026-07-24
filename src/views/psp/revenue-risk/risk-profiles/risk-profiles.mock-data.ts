import type { ProfileListItem } from './risk-profiles.types';

export const MOCK_PROFILES: ProfileListItem[] = [
  { profileId: 1, encodedProfileId: 'enc_1', profileName: 'Default Action Based', profileType: 'Action based', actionBased: true, defaultProfile: true, deprecated: false, premium: true, assignedMerchantCodes: 12, lastModified: 'Apr 1, 2026', runningExperiment: false },
  { profileId: 2, encodedProfileId: 'enc_2', profileName: 'High-Value Transactions', profileType: 'Action based', actionBased: true, defaultProfile: false, deprecated: false, premium: true, assignedMerchantCodes: 5, lastModified: 'Mar 28, 2026', runningExperiment: true },
  { profileId: 3, encodedProfileId: 'enc_3', profileName: 'Low-Risk Markets', profileType: 'Action based', actionBased: true, defaultProfile: false, deprecated: false, premium: false, assignedMerchantCodes: 8, lastModified: 'Mar 15, 2026', runningExperiment: false },
  { profileId: 4, encodedProfileId: 'enc_4', profileName: 'MOTO Transactions', profileType: 'Score based', actionBased: false, defaultProfile: false, deprecated: false, premium: false, assignedMerchantCodes: 3, lastModified: 'Feb 20, 2026', runningExperiment: false },
  { profileId: 5, encodedProfileId: 'enc_5', profileName: 'Recurring Payments', profileType: 'Score based', actionBased: false, defaultProfile: false, deprecated: false, premium: false, assignedMerchantCodes: 6, lastModified: 'Mar 5, 2026', runningExperiment: false },
  { profileId: 6, encodedProfileId: 'enc_6', profileName: 'POS Transactions', profileType: 'Action based', actionBased: true, defaultProfile: false, deprecated: false, premium: true, assignedMerchantCodes: 4, lastModified: 'Apr 5, 2026', runningExperiment: false },
  { profileId: 7, encodedProfileId: 'enc_7', profileName: 'Legacy Score Profile', profileType: 'Score based', actionBased: false, defaultProfile: false, deprecated: true, premium: false, assignedMerchantCodes: 0, lastModified: 'Jan 10, 2026', runningExperiment: false },
];
