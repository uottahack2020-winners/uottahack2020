import 'package:flutter/material.dart';
import 'package:innova/screens/login_screen.dart';


// TODO: LOTS ON THIS PAGE..
// grab user data
// do something w it (not sure yet)

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {

    Arguments args = ModalRoute.of(context).settings.arguments;
    String email = args.email;

    return Scaffold(
      body: Container(
        child: Center(
          child: Text(
              'Welcome back $email!'
          ),
        ),
      ),
    );
  }
}