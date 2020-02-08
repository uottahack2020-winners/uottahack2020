import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:innova/constants/input_decoration.dart';

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {

  String email;
  String password;
  String firstName;
  String lastName;

  final FirebaseAuth _auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Row(
                children: <Widget>[
                  Expanded(
                    child: TextField(
                        keyboardType: TextInputType.emailAddress,
                        textAlign: TextAlign.center,
                        decoration: inputDecoration,
                    ),
                  ),
                  Expanded(
                    child: TextField(
                        textAlign: TextAlign.center,
                        decoration: inputDecoration,
                    ),
                  ),
                ]
              ),
//            TextField(
//                keyboardType: TextInputType.emailAddress,
//                textAlign: TextAlign.center,
//                decoration: InputDecoration(
//                    hintText: 'Enter a value',
//                    contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
//                    border: OutlineInputBorder(
//                      borderRadius: BorderRadius.all(Radius.circular(32.0)),
//                    ),
//                    enabledBorder: OutlineInputBorder(
//                      borderSide: BorderSide(color: Colors.blueAccent, width: 1.0),
//                      borderRadius: BorderRadius.all(Radius.circular(32.0)),
//                    ),
//                    focusedBorder: OutlineInputBorder(
//                      borderSide: BorderSide(color: Colors.blueAccent, width: 2.0),
//                      borderRadius: BorderRadius.all(Radius.circular(32.0)),
//                    ),
//                ),
//                onChanged: (value) {
//                  firstName = value;
//                }
//            ),
//              TextField(
//                obscureText: false,
//                textAlign: TextAlign.center,
//                onChanged: (value) {
//                  password = value;
//                },
//              ),
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
      ),
    );
  }
}