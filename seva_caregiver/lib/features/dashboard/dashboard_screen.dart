import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/app_colors.dart';
import '../patients/patients_screen.dart';
import '../earnings/earnings_screen.dart';
import '../settings/profile_screen.dart';
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
        title: const Text('SEVA Caregiver'),
        actions: [
          IconButton(
            icon: const Icon(Icons.qr_code_scanner),
            onPressed: () {},
          ),
          const SizedBox(width: 8),
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
            icon: Icon(Icons.schedule_outlined),
            selectedIcon: Icon(Icons.schedule),
            label: 'Schedule',
          ),
          NavigationDestination(
            icon: Icon(Icons.people_outline),
            selectedIcon: Icon(Icons.people),
            label: 'Patients',
          ),
          NavigationDestination(
            icon: Icon(Icons.account_balance_wallet_outlined),
            selectedIcon: Icon(Icons.account_balance_wallet),
            label: 'Earnings',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }

  Widget _buildBody() {
    switch (_currentIndex) {
      case 0:
        return _buildScheduleTab();
      case 1:
        return const PatientsScreen();
      case 2:
        return const EarningsScreen();
      case 3:
        return const ProfileScreen();
      default:
        return const SizedBox();
    }
  }

  Widget _buildScheduleTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        _buildGreetingCard(),
        const SizedBox(height: 16),
        _buildQuickStats(),
        const SizedBox(height: 24),
        _buildLateAlert(),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text("Today's Itinerary", style: Theme.of(context).textTheme.titleLarge),
            Text('3 Visits', style: Theme.of(context).textTheme.titleMedium?.copyWith(color: AppColors.primary)),
          ],
        ),
        const SizedBox(height: 16),
        _buildVisitCard(
          time: '09:00 AM - 11:00 AM',
          patientName: 'Ramesh Kumar',
          address: 'Flat 402, Sea View Apts, Bandra',
          status: 'In Progress',
          isCurrent: true,
        ),
        const SizedBox(height: 12),
        _buildVisitCard(
          time: '01:00 PM - 03:00 PM',
          patientName: 'Meena Shah',
          address: 'Juhu Tara Road',
          status: 'Upcoming',
          isCurrent: false,
        ),
        const SizedBox(height: 12),
        _buildVisitCard(
          time: '04:00 PM - 05:00 PM',
          patientName: 'Anil Gupta',
          address: 'Powai Hiranandani',
          status: 'Upcoming',
          isCurrent: false,
        ),
      ],
    );
  }

  Widget _buildGreetingCard() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Good Morning, Sunita 👋', style: Theme.of(context).textTheme.headlineMedium),
        const SizedBox(height: 4),
        Text('You have 3 visits today in Andheri & Bandra', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
      ],
    );
  }

  Widget _buildQuickStats() {
    return Row(
      children: [
        Expanded(child: _buildStatChip('32', 'Completed', AppColors.success)),
        const SizedBox(width: 8),
        Expanded(child: _buildStatChip('13', 'Pending', AppColors.warning)),
        const SizedBox(width: 8),
        Expanded(child: _buildStatChip('4.8', 'Rating ⭐', AppColors.primary)),
      ],
    );
  }

  Widget _buildStatChip(String value, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 8),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.2)),
      ),
      child: Column(
        children: [
          Text(value, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: color)),
          const SizedBox(height: 4),
          Text(label, style: TextStyle(fontSize: 10, fontWeight: FontWeight.w600, color: color)),
        ],
      ),
    );
  }

  Widget _buildLateAlert() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.warning.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.warning),
      ),
      child: Row(
        children: [
          const Icon(Icons.warning_amber_rounded, color: AppColors.warning),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Upcoming Visit', style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.warning)),
                Text('Next visit starts in 20 mins. Please check in soon.', style: TextStyle(fontSize: 12, color: AppColors.warning.withOpacity(0.8))),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildVisitCard({
    required String time,
    required String patientName,
    required String address,
    required String status,
    required bool isCurrent,
  }) {
    return Card(
      elevation: isCurrent ? 2 : 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
        side: BorderSide(
          color: isCurrent ? AppColors.primary : AppColors.border,
          width: isCurrent ? 2 : 1,
        ),
      ),
      child: InkWell(
        onTap: () => _showVisitBottomSheet(context, patientName, time, address, status),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(time, style: const TextStyle(fontWeight: FontWeight.bold)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: isCurrent ? AppColors.primary.withValues(alpha: 0.1) : AppColors.surface,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      status,
                      style: TextStyle(
                        color: isCurrent ? AppColors.primary : AppColors.textSecondary,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  const CircleAvatar(
                    backgroundColor: AppColors.primaryLight,
                    child: Icon(Icons.person, color: AppColors.primary),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(patientName, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
                        Row(
                          children: [
                            const Icon(Icons.location_on, size: 14, color: AppColors.textSecondary),
                            const SizedBox(width: 4),
                            Text(address, style: const TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              if (isCurrent) ...[
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => context.push('/visit-details'),
                    child: const Text('View Visit Details'),
                  ),
                )
              ]
            ],
          ),
        ),
      ),
    );
  }

  void _showVisitBottomSheet(BuildContext context, String patientName, String time, String address, String status) {
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
                  Text(patientName, style: Theme.of(context).textTheme.headlineMedium),
                  IconButton(icon: const Icon(Icons.close), onPressed: () => Navigator.pop(context)),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.access_time, size: 16, color: AppColors.textSecondary),
                  const SizedBox(width: 8),
                  Text(time, style: const TextStyle(color: AppColors.textSecondary, fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.location_on, size: 16, color: AppColors.textSecondary),
                  const SizedBox(width: 8),
                  Text(address, style: const TextStyle(color: AppColors.textSecondary)),
                ],
              ),
              const SizedBox(height: 24),
              Text('Care Plan Summary', style: Theme.of(context).textTheme.titleLarge),
              const SizedBox(height: 12),
              _buildCarePlanItem('09:00 AM', 'Vital Checks (BP, Sugar)'),
              _buildCarePlanItem('09:30 AM', 'Assist with Breakfast'),
              _buildCarePlanItem('10:00 AM', 'Physiotherapy exercises'),
              const SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton.icon(
                      onPressed: () {},
                      icon: const Icon(Icons.map),
                      label: const Text('Directions'),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        Navigator.pop(context);
                        context.push('/visit-details');
                      },
                      icon: const Icon(Icons.play_circle_fill),
                      label: Text(status == 'In Progress' ? 'Resume' : 'Check In'),
                    ),
                  ),
                ],
              )
            ],
          ),
        );
      },
    );
  }

  Widget _buildCarePlanItem(String time, String task) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Text(time, style: const TextStyle(fontWeight: FontWeight.bold, color: AppColors.primary, fontSize: 12)),
          const SizedBox(width: 16),
          Expanded(child: Text(task, style: const TextStyle(fontSize: 14))),
        ],
      ),
    );
  }
}
