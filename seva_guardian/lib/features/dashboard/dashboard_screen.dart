import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';
import '../caregivers/caregivers_screen.dart';
import '../visits/visits_screen.dart';
import '../settings/more_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SEVA Health'),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
          const CircleAvatar(
            backgroundColor: AppColors.primaryLight,
            child: Text('MJ', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(width: 16),
        ],
      ),
      body: _buildBody(),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.home_outlined),
            selectedIcon: Icon(Icons.home),
            label: 'Home',
          ),
          NavigationDestination(
            icon: Icon(Icons.people_outline),
            selectedIcon: Icon(Icons.people),
            label: 'Caregivers',
          ),
          NavigationDestination(
            icon: Icon(Icons.calendar_today_outlined),
            selectedIcon: Icon(Icons.calendar_today),
            label: 'Visits',
          ),
          NavigationDestination(
            icon: Icon(Icons.menu),
            label: 'More',
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    switch (_currentIndex) {
      case 0:
        return _buildHomeTab();
      case 1:
        return const CaregiversScreen();
      case 2:
        return const VisitsScreen();
      case 3:
        return const MoreScreen();
      default:
        return const SizedBox();
    }
  }

  Widget _buildHomeTab() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          _buildPatientCard(),
          const SizedBox(height: 24),
          Text("Today's Visit", style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          _buildVisitCard(),
          const SizedBox(height: 24),
          Text('Quick Actions', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          _buildQuickActions(),
          const SizedBox(height: 24),
          Text('Recent Activity', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          _buildRecentActivity(),
        ],
      ),
    );
  }

  Widget _buildPatientCard() {
    return Card(
      child: InkWell(
        onTap: () => _showCarePlanBottomSheet(context),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              Row(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.success, width: 3),
                    ),
                    child: const CircleAvatar(
                      radius: 30,
                      child: const Icon(Icons.person, color: Colors.white),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Ramesh Kumar', style: Theme.of(context).textTheme.titleLarge),
                        const SizedBox(height: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.success.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: const Text(
                            'Doing Well Today',
                            style: TextStyle(color: AppColors.success, fontSize: 12, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right),
                ],
              ),
              const Divider(height: 32),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Expanded(child: _buildVitalsInfo(Icons.favorite, 'BP', '120/80')),
                  Expanded(child: _buildVitalsInfo(Icons.monitor_heart, 'Heart', '72 bpm')),
                  Expanded(child: _buildVitalsInfo(Icons.thermostat, 'Temp', '98.6°F')),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showCarePlanBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (context) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20, right: 20, top: 24,
            bottom: MediaQuery.of(context).padding.bottom + 20,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Care Plan: Ramesh Kumar', style: Theme.of(context).textTheme.headlineMedium),
                  IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(context)),
                ],
              ),
              const SizedBox(height: 16),
              _buildCarePlanItem('10:00 AM', 'Medication'),
              _buildCarePlanItem('01:00 PM', 'Lunch & Rest'),
              _buildCarePlanItem('02:30 PM', 'Physiotherapy'),
              _buildCarePlanItem('06:00 PM', 'Evening Walk'),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Close'),
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCarePlanItem(String time, String task) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Text(time, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary, fontSize: 14)),
          const SizedBox(width: 16),
          Expanded(child: Text(task, style: const TextStyle(fontSize: 16))),
        ],
      ),
    );
  }

  Widget _buildVitalsInfo(IconData icon, String label, String value) {
    return InkWell(
      onTap: () {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Viewing 7-day trend for $label')));
      },
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary, size: 24),
            const SizedBox(height: 4),
            Text(value, style: const TextStyle(fontWeight: FontWeight.bold)),
            Text(label, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
          ],
        ),
      ),
    );
  }

  Widget _buildVisitCard() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: AppColors.warning.withValues(alpha: 0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text(
                    'Upcoming in 2 hrs',
                    style: TextStyle(color: AppColors.warning, fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ),
                Flexible(
                  child: const Text('10:00 AM - 12:00 PM', style: TextStyle(fontWeight: FontWeight.w500), textAlign: TextAlign.right),
                ),
              ],
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(
              value: 0.2, // Visual timeline progress
              backgroundColor: AppColors.border,
              valueColor: AlwaysStoppedAnimation<Color>(AppColors.primary),
              borderRadius: BorderRadius.circular(4),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const CircleAvatar(
                  child: const Icon(Icons.person, color: Colors.white),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text('Sunita Verma', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                      Text('Dementia Care · Bandra', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.chat_bubble_outline, color: AppColors.primary),
                  onPressed: () {}, // Navigate to Chat when ready
                )
              ],
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => context.push('/visit-details'),
                child: const Text('View Visit Details'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActions() {
    return Row(
      children: [
        Expanded(
          child: _buildActionBtn(Icons.search, 'Find\nCaregiver', () {
            setState(() {
              _currentIndex = 1;
            });
          }),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildActionBtn(Icons.assignment, 'Care\nPlans', () {
            context.push('/care-plans');
          }),
        ),
        const SizedBox(width: 16),
        Expanded(
          child: _buildActionBtn(Icons.receipt_long, 'Billing &\nPayments', () {
            // Action to view billing
          }),
        ),
      ],
    );
  }

  Widget _buildActionBtn(IconData icon, String label, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.border),
        ),
        child: Column(
          children: [
            Icon(icon, color: AppColors.primary, size: 28),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w500),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRecentActivity() {
    return Card(
      child: Column(
        children: [
          _buildActivityItem(Icons.person_add, 'New caregiver assigned: Sunita Verma', '2 hours ago'),
          const Divider(height: 1),
          _buildActivityItem(Icons.update, 'Care plan updated by Admin', 'Yesterday'),
        ],
      ),
    );
  }

  Widget _buildActivityItem(IconData icon, String text, String time) {
    return ListTile(
      leading: CircleAvatar(
        backgroundColor: AppColors.primaryLight,
        child: Icon(icon, color: AppColors.primary, size: 20),
      ),
      title: Text(text, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500)),
      subtitle: Text(time, style: const TextStyle(fontSize: 12)),
      onTap: () {},
    );
  }
}
