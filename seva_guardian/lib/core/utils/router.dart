
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../features/auth/login_screen.dart';
import '../../features/dashboard/dashboard_screen.dart';
import '../../features/caregivers/caregiver_detail_screen.dart';
import '../../features/visits/visit_detail_screen.dart';
import '../../features/care_plans/care_plan_screen.dart';

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
        path: '/caregiver-details',
        builder: (context, state) => const CaregiverDetailScreen(),
      ),
      GoRoute(
        path: '/visit-details',
        builder: (context, state) => const VisitDetailScreen(),
      ),
      GoRoute(
        path: '/care-plans',
        builder: (context, state) => const CarePlanScreen(),
      ),
    ],
  );
});
