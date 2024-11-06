package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"slices"
	"strings"
)

func main() {
	port := flag.String("port", "4000", "Port number")
	word := flag.String("word", "apple", "Word to guess")
	flag.Parse()

	wordList := getWordList()

	mux := http.NewServeMux()
	mux.Handle("GET /", http.FileServer(http.Dir(".")))
	mux.Handle("GET /api/word", getWord(*word))
	mux.Handle("POST /api/validate", validate(wordList))
	fmt.Printf("Server listening at http://localhost:%v\n", *port)
	err := http.ListenAndServe(":"+*port, logRequest(mux))
	log.Fatal(err)
}

func getWordList() []string {
	blob, err := os.ReadFile("./word-list.txt")
	if err != nil {
		log.Fatal(err)
	}
	return strings.Fields(string(blob))
}

func validate(wordList []string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		err := r.ParseForm()
		if err != nil {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		wordValues, ok := r.PostForm["word"]
		if !ok {
			http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
			return
		}
		word := wordValues[0]
		if !slices.Contains(wordList, word) {
			http.Error(w, http.StatusText(http.StatusUnprocessableEntity), http.StatusUnprocessableEntity)
			return
		}

	})
}

func getWord(word string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, word)
	})
}

func logRequest(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%v %v\n", r.Method, r.URL.RequestURI())
		next.ServeHTTP(w, r)
	})
}
