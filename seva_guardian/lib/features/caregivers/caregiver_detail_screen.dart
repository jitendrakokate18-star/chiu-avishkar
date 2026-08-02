import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';
import 'package:go_router/go_router.dart';

class CaregiverDetailScreen extends StatelessWidget {
  const CaregiverDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Caregiver Profile'),
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
            Text('Sunita Verma', style: Theme.of(context).textTheme.headlineMedium?.copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            const Text('Dementia Care Specialist • Mumbai', style: TextStyle(color: AppColors.textSecondary, fontSize: 16)),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.star, color: AppColors.warning, size: 24),
                const SizedBox(width: 4),
                const Text('4.8', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                const SizedBox(width: 8),
                Text('(120+ reviews)', style: TextStyle(color: AppColors.textSecondary)),
              ],
            ),
            const SizedBox(height: 32),
            _buildSection(context, 'About', 'Sunita is a certified dementia care specialist with over 8 years of experience. She is highly rated for her compassionate approach and expertise in managing Alzheimer\'s patients.'),
            const SizedBox(height: 24),
            _buildSection(context, 'Specialties', '• Dementia Care\n• Post-Op Recovery\n• Mobility Assistance'),
            const SizedBox(height: 24),
            _buildSection(context, 'Languages', '• English\n• Hindi\n• Marathi'),
            const SizedBox(height: 48),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
                child: const Text('Request Booking', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget _buildSection(BuildContext context, String title, String content) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold)),
        const SizedBox(height: 8),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surface,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(color: AppColors.border),
          ),
          child: Text(content, style: const TextStyle(fontSize: 15, height: 1.5)),
        )
      ],
    );
  }
}
