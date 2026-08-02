import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/theme/app_colors.dart';
import '../../core/utils/theme_provider.dart';

class MoreScreen extends ConsumerWidget {
  const MoreScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isDark = ref.watch(themeModeProvider) == ThemeMode.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('More Options'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildListTile(Icons.assignment_outlined, 'Care Plans', 'View and manage routines'),
          const Divider(),
          _buildListTile(Icons.analytics_outlined, 'Reports', 'Vitals and visit summaries'),
          const Divider(),
          _buildListTile(Icons.chat_bubble_outline, 'Chat', 'Message caregivers and admin'),
          const Divider(),
          _buildListTile(Icons.receipt_long_outlined, 'Payments', 'Invoices and billing history'),
          const Divider(),
          _buildListTile(Icons.notifications_outlined, 'Notifications', 'Alerts and updates'),
          const Divider(),
          _buildListTile(Icons.settings_outlined, 'Settings', 'Profile and preferences'),
          const SizedBox(height: 24),
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
      contentPadding: EdgeInsets.zero,
      onTap: () {},
    );
  }
}
