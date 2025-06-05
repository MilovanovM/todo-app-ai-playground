class Todo {
  final int id;
  final String text;

  Todo({required this.id, required this.text});

  factory Todo.fromJson(Map<String, dynamic> json) {
    return Todo(id: json['id'], text: json['text']);
  }

  Map<String, dynamic> toJson() {
    return {'text': text};
  }
}
