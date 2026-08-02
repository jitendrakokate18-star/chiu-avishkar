import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/theme/app_colors.dart';
import '../../core/utils/theme_provider.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = ref.watch(themeModeProvider) == ThemeMode.dark;
    
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Center(
            child: CircleAvatar(
              radius: 50,
              child: const Icon(Icons.person, color: Colors.white),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'Sunita Verma',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(width: 8),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.success.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.success.withValues(alpha: 0.2)),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.verified, size: 14, color: AppColors.success),
                    SizedBox(width: 4),
                    Text('Aadhaar Verified', style: TextStyle(color: AppColors.success, fontSize: 10, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Center(
            child: Text(
              'Senior Care Specialist · Andheri',
              style: TextStyle(color: AppColors.textSecondary),
            ),
          ),
          const SizedBox(height: 32),
          Text('Preferences', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          SwitchListTile(
            title: const Text('Dark Mode Theme', style: TextStyle(fontWeight: FontWeight.w600)),
            subtitle: const Text('Switch between light and dark themes', style: TextStyle(fontSize: 12)),
            secondary: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(color: AppColors.primaryLight, borderRadius: BorderRadius.circular(8)),
              child: const Icon(Icons.dark_mode_outlined, color: AppColors.primary),
            ),
            value: isDark,
            onChanged: (_) => ref.read(themeModeProvider.notifier).toggle(),
            contentPadding: EdgeInsets.zero,
          ),
          const Divider(),
          _buildListTile(Icons.notifications_outlined, 'Notification Preferences', 'Email & SMS selected'),
          const SizedBox(height: 24),
          Text('Account & Support', style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 8),
          _buildListTile(Icons.assignment_ind_outlined, 'Certifications', 'View your qualifications'),
          const Divider(),
          _buildListTile(Icons.schedule_outlined, 'Availability Settings', 'Set your working hours'),
          const Divider(),
          _buildListTile(Icons.history, 'Visit History', 'View past completed visits'),
          const Divider(),
          _buildListTile(Icons.support_agent, 'Help & Support', 'Contact SEVA admin'),
          const SizedBox(height: 32),
          Center(
            child: TextButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.logout, color: AppColors.error),
              label: const Text('Log Out', style: TextStyle(color: AppColors.error)),
            ),
          )
        ],
      ),
    );
  }

  Widget _buildListTile(IconData icon, String title, String subtitle) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primaryLight,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: AppColors.primary),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
      subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
      trailing: const Icon(Icons.chevron_right),
      contentPadding: EdgeInsets.symmetric(vertical: 4),
      onTap: () {},
    );
  }
}
