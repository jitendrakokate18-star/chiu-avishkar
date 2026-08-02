import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/login_screen.dart';
import '../../features/dashboard/dashboard_screen.dart';
import '../../features/patients/patient_detail_screen.dart';
import '../../features/visits/visit_detail_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/login',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/patient-details',
        builder: (context, state) => const PatientDetailScreen(),
      ),
      GoRoute(
        path: '/visit-details',
        builder: (context, state) => const VisitDetailScreen(),
      ),
    ],
  );
});
