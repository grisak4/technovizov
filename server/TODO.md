## 1. librarian:
1) add/change/delete "books" (post/patch/delete)
2) add/change/delete "authors_books" (post/patch/delete)
3) add/change/delete "readers" (post/patch/delete) (+, -, -)
4) узнать про "readers" (get) (+)
5) выдать все книни "books" выбраного "genre" (get)
6) выдать книги "readers" (get)

## 2. reader:
1) добавить книгу в список желаемых (get) - redis
2) просматривать книги которые брал (get) - redis
3) выбор книги по жанрам (get)



сделать алгоритм для библеотекаря, заполнение читателя:
1) ввод данных о читателе (фамилия, имя, ...)
2) генерация для него данных входа (login, password)