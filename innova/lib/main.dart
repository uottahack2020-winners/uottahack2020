import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:innova/screens/home-screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      initialRoute: 'welcomeScreen',
      routes: {
        'welcomeScreen': (context) => WelcomeScreen(),
        'homeScreen': (context) => HomeScreen(),
      }
    );
  }
}

class WelcomeScreen extends StatefulWidget {
  @override
  _WelcomeScreenState createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {

  String email;
  String password;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: <Widget>[
            TextField(
                keyboardType: TextInputType.emailAddress,
                textAlign: TextAlign.center,
                onChanged: (value) {
                  email = value;
                }
            ),
            TextField(
              obscureText: false,
              textAlign: TextAlign.center,
              onChanged: (value) {
                password = value;
              },
            ),
            Padding(
              padding: EdgeInsets.symmetric(vertical: 16.0),
                child: Material(
                elevation: 5.0, color: Colors.blue,
                borderRadius: BorderRadius.circular(30.0),
                child: MaterialButton(
                  onPressed: () async {
                    try {
                      final firebaseUser = await _auth.createUserWithEmailAndPassword(email: email.trim(), password: password);

                      if (firebaseUser != null) {
                        Navigator.pushNamed(context, 'homeScreen');
                      }
                    } catch (e) {
                      print(e);
                    }

                  },
                  minWidth: 200.0,
                  height: 42.0,
                  child: Text(
                    'Register',
                    style: TextStyle(
                      color: Colors.white,
                    ),
                  ),
                ),
              ),
          ),
          ],
        ),
      ),
    );
  }
}
