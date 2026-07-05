// Mock data for future RWA features (frontend-only, no blockchain)

export const mockInvestors = [
  { id: 1, name: 'Andi Pratama', type: 'Individual', portfolio: '$12,500', status: 'Active', joinDate: '2024-01-15', avatar: 'AP' },
  { id: 2, name: 'PT Maju Bersama', type: 'Institutional', portfolio: '$85,000', status: 'Active', joinDate: '2024-02-20', avatar: 'MB' },
  { id: 3, name: 'Siti Rahayu', type: 'Individual', portfolio: '$5,200', status: 'Pending', joinDate: '2024-03-10', avatar: 'SR' },
  { id: 4, name: 'CV Nusantara Jaya', type: 'Institutional', portfolio: '$42,000', status: 'Active', joinDate: '2024-04-05', avatar: 'NJ' },
  { id: 5, name: 'Budi Santoso', type: 'Individual', portfolio: '$8,750', status: 'Active', joinDate: '2024-05-12', avatar: 'BS' },
  { id: 6, name: 'PT Indo Global', type: 'Institutional', portfolio: '$120,000', status: 'Inactive', joinDate: '2024-06-01', avatar: 'IG' },
];

export const mockOpportunities = [
  { id: 1, name: 'Batik Heritage Outlet', category: 'Retail', minInvestment: '$5,000', expectedReturn: '12-15%', status: 'Open', risk: 'Medium', location: 'Jakarta' },
  { id: 2, name: 'Kopi Nusantara Chain', category: 'F&B', minInvestment: '$10,000', expectedReturn: '18-22%', status: 'Open', risk: 'High', location: 'Bandung' },
  { id: 3, name: 'EcoFarm Organic', category: 'Agriculture', minInvestment: '$3,000', expectedReturn: '8-10%', status: 'Funded', risk: 'Low', location: 'Bali' },
  { id: 4, name: 'TechHub Coworking', category: 'Property', minInvestment: '$15,000', expectedReturn: '10-14%', status: 'Open', risk: 'Medium', location: 'Surabaya' },
  { id: 5, name: 'Seafood Supply Chain', category: 'Supply Chain', minInvestment: '$8,000', expectedReturn: '14-18%', status: 'Coming Soon', risk: 'Medium', location: 'Makassar' },
];

export const mockPortfolio = [
  { id: 1, asset: 'Batik Heritage Outlet', invested: '$5,000', currentValue: '$5,650', return: '+13%', status: 'Active', tokenId: 'RWA-001' },
  { id: 2, asset: 'EcoFarm Organic', invested: '$3,000', currentValue: '$3,270', return: '+9%', status: 'Active', tokenId: 'RWA-003' },
  { id: 3, asset: 'TechHub Coworking', invested: '$15,000', currentValue: '$16,200', return: '+8%', status: 'Active', tokenId: 'RWA-004' },
];

export const mockRevenue = [
  { id: 1, asset: 'Batik Heritage Outlet', period: 'Q1 2024', revenue: '$1,200', share: '$180', status: 'Distributed', date: '2024-04-01' },
  { id: 2, asset: 'EcoFarm Organic', period: 'Q1 2024', revenue: '$800', share: '$80', status: 'Distributed', date: '2024-04-01' },
  { id: 3, asset: 'Batik Heritage Outlet', period: 'Q2 2024', revenue: '$1,500', share: '$225', status: 'Pending', date: '2024-07-01' },
  { id: 4, asset: 'TechHub Coworking', period: 'Q1 2024', revenue: '$3,200', share: '$480', status: 'Distributed', date: '2024-04-01' },
  { id: 5, asset: 'TechHub Coworking', period: 'Q2 2024', revenue: '$3,800', share: '$570', status: 'Processing', date: '2024-07-01' },
];

export const mockOperators = [
  { id: 1, name: 'PT Batik Nusantara', outlets: 3, rating: 4.8, revenue: '$45,000', status: 'Active', location: 'Jakarta' },
  { id: 2, name: 'Kopi Indo Management', outlets: 5, rating: 4.5, revenue: '$78,000', status: 'Active', location: 'Bandung' },
  { id: 3, name: 'EcoFarm Corp', outlets: 2, rating: 4.9, revenue: '$22,000', status: 'Active', location: 'Bali' },
  { id: 4, name: 'TechSpace Indonesia', outlets: 1, rating: 4.2, revenue: '$35,000', status: 'Under Review', location: 'Surabaya' },
];

export const mockMarketplace = [
  { id: 1, name: 'RWA-001: Batik Heritage', price: '$5,650', change: '+2.3%', volume: '$12,500', category: 'Retail', listed: '2024-01-20' },
  { id: 2, name: 'RWA-003: EcoFarm', price: '$3,270', change: '+1.1%', volume: '$5,200', category: 'Agriculture', listed: '2024-02-15' },
  { id: 3, name: 'RWA-004: TechHub', price: '$16,200', change: '-0.5%', volume: '$28,000', category: 'Property', listed: '2024-03-01' },
  { id: 4, name: 'RWA-005: Seafood SC', price: '$8,000', change: '+0.0%', volume: '$0', category: 'Supply Chain', listed: 'Coming Soon' },
];

export const mockAnalytics = {
  totalInvestors: 156,
  totalAssets: 12,
  totalInvested: '$2.4M',
  avgReturn: '13.5%',
  monthlyRevenue: [
    { month: 'Jan', value: 12500 },
    { month: 'Feb', value: 15200 },
    { month: 'Mar', value: 18700 },
    { month: 'Apr', value: 22100 },
    { month: 'May', value: 19800 },
    { month: 'Jun', value: 25400 },
  ],
  assetDistribution: [
    { category: 'Retail', percentage: 35 },
    { category: 'F&B', percentage: 25 },
    { category: 'Property', percentage: 20 },
    { category: 'Agriculture', percentage: 12 },
    { category: 'Supply Chain', percentage: 8 },
  ],
};

export const mockNotifications = [
  { id: 1, title: 'Brand Approved', message: 'Batik Heritage has been approved by admin.', time: '2 min ago', type: 'success', read: false },
  { id: 2, title: 'New Investment', message: 'PT Maju Bersama invested $10,000 in Kopi Nusantara.', time: '1 hour ago', type: 'info', read: false },
  { id: 3, title: 'Revenue Distributed', message: 'Q1 2024 revenue has been distributed to investors.', time: '3 hours ago', type: 'success', read: true },
  { id: 4, title: 'New Brand Registered', message: 'EcoFarm Organic has been registered on Stellar.', time: '1 day ago', type: 'info', read: true },
  { id: 5, title: 'System Update', message: 'Platform maintenance scheduled for July 10.', time: '2 days ago', type: 'warning', read: true },
  { id: 6, title: 'Marketplace Launch', message: 'RWA token marketplace is now in beta.', time: '3 days ago', type: 'info', read: true },
];

export const mockProfile = {
  name: 'Fahri Zulfikar',
  email: 'fahri@navartha.io',
  role: 'Platform Admin',
  walletAddress: 'GDQP2K...X7YZ',
  joinDate: 'January 2024',
  kycStatus: 'Verified',
  twoFactor: true,
};
