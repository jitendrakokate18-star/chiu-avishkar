import 'package:flutter/material.dart';
import '../../core/theme/app_colors.dart';

class CarePlanScreen extends StatelessWidget {
  const CarePlanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Care Plans'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildCarePlanCard(context, 'Ramesh Kumar', '10:00 AM - 12:00 PM', 'Dementia Care'),
        ],
      ),
    );
  }

  Widget _buildCarePlanCard(BuildContext context, String patientName, String time, String type) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(patientName, style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: 4),
            Text(type, style: const TextStyle(color: AppColors.textSecondary)),
            const Divider(height: 32),
            _buildCarePlanItem('10:00 AM', 'Medication (Done)', isCompleted: true),
            _buildCarePlanItem('01:00 PM', 'Lunch & Rest'),
            _buildCarePlanItem('02:30 PM', 'Physiotherapy'),
            _buildCarePlanItem('06:00 PM', 'Evening Walk'),
          ],
        ),
      ),
    );
  }

  Widget _buildCarePlanItem(String time, String task, {bool isCompleted = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        children: [
          Icon(
            isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
            color: isCompleted ? AppColors.success : AppColors.textMuted,
            size: 20,
          ),
          const SizedBox(width: 12),
          Text(time, style: TextStyle(fontWeight: FontWeight.bold, color: isCompleted ? AppColors.success : AppColors.primary, fontSize: 14)),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              task, 
              style: TextStyle(
                fontSize: 16, 
                color: isCompleted ? AppColors.textSecondary : AppColors.textPrimary,
                decoration: isCompleted ? TextDecoration.lineThrough : null,
              )
            )
          ),
        ],
      ),
    );
  }
}
