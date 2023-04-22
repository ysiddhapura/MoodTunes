import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';
import 'package:shared_preferences/shared_preferences.dart';

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> with SingleTickerProviderStateMixin {
  String _mood = '';
  List<Map<String, dynamic>> _songs = [];
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  // This function sends a GET request with the user's mood and parses the JSON response
  Future<void> _fetchSongs(String mood) async {
    String url = 'https://your-api-url-here.com/api/songs?mood=$mood';
    http.Response response = await http.get(Uri.parse(url));
    List<dynamic> jsonResponse = jsonDecode(response.body);
    List<Map<String, dynamic>> songs = jsonResponse.map((song) => {
          'name': song['name'],
          'artist': song['artist'],
          'url': song['url'],
        }).toList();

    setState(() {
      _songs = songs;
      _animationController.forward(); // Start the animation
    });
  }

  // This function navigates to the favorites page
  void _navigateToFavorites() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => FavoritesPage()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            SlideTransition(
              position: Tween<Offset>(
                begin: Offset.zero,
                end: Offset(0, -1),
              ).animate(_animationController),
              child: Column(
                children: [
                  TextField(
                    onChanged: (value) => _mood = value,
                    decoration: InputDecoration(
                      labelText: 'Enter your mood',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () => _fetchSongs(_mood),
                    child: Text('Generate'),
                  ),
                ],
              ),
            ),
            ..._songs.map(
              (song) => ListTile(
                title: Text.rich(
                  TextSpan(
                    text: song['name'],
                    style: TextStyle(color: Colors.blue),
                    children: [
                      TextSpan(
                        text: ' by ${song['artist']}',
                        style: TextStyle(color: Colors.black),
                      ),
                    ],
                  ),

                  // InkWell(
                  //   onTap: () => launch(song['url']),
                  //   child: Text(
                  //     'Click me!',
                  //     style: TextStyle(
                  //       fontSize: 18.0,
                  //     ),
                  //   ),
                  //   )
                  // onTap: () => launch(song['url']),
                ),
              ),
            ).toList(),
          ],
        ),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Row(
          children: [
            IconButton(
              icon: Icon(Icons.star),
              onPressed: _navigateToFavorites,
            ),
            Text('Favorites'),
          ],
        ),
      ),
    );
  }
}

class FavoritesPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Favorites'),
      ),
      body: Center(
        child: Text('Your favorited songs will be displayed here.'),
      ),
    );
  }
}

