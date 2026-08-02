import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import 'package:go_router/go_router.dart';

class PatientDetailScreen extends StatelessWidget {
  const PatientDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Patient Profile'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.pop(),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const CircleAvatar(
              radius: 50,
              child: const Icon(Icons.person, color: Colors.white),
            ),
            const SizedBox(height: 16),
            Text('Ramesh Kumar', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('78 yrs • Alzheimer\'s Patient', style: TextStyle(color: AppColors.textSecondary, fontSize: 16)),
            const SizedBox(height: 32),
            _buildInfoCard(context, 'Guardian Contact', 'Sita Kumar\n+91 91234-56780\nsita.k@email.com', Icons.family_restroom),
            const SizedBox(height: 16),
            _buildInfoCard(context, 'Address', '142, Sea View Apartments, Bandra West, Mumbai 400050', Icons.location_on),
            const SizedBox(height: 16),
            _buildInfoCard(context, 'Medical Notes', 'Requires help with mobility. Needs medication at 10 AM and 8 PM strictly. Prefers soft diet.', Icons.medical_information),
            const SizedBox(height: 48),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.call),
                label: const Text('Contact Guardian', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildInfoCard(BuildContext context, String title, String content, IconData icon) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.border),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: AppColors.primary),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 8),
                Text(content, style: const TextStyle(fontSize: 15, height: 1.5, color: AppColors.textSecondary)),
              ],
            ),
          )
        ],
      ),
    );
  }
}
