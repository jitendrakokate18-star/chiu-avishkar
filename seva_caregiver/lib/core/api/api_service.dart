import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Local network IP for the JSON Server backend.
  static const String baseUrl = 'http://192.168.0.101:3000';

  static Future<List<dynamic>> getPatients() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/patients'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Error fetching patients: $e');
    }
    return [];
  }

  static Future<List<dynamic>> getVisits() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/visits'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Error fetching visits: $e');
    }
    return [];
  }

  static Future<List<dynamic>> getEarnings() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/earnings'));
      if (response.statusCode == 200) {
        return json.decode(response.body);
      }
    } catch (e) {
      print('Error fetching earnings: $e');
    }
    return [];
  }
}
