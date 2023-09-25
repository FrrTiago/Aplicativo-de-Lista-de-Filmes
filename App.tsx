import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
}

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([
  {
      id: 1,
      title: 'Spider-Man',
      genre: 'Ação',
      rating: 5,
    },
    {
      id: 2,
      title: 'Toy Story',
      genre: 'Animação',
      rating: 4,
    },
    {
      id: 3,
      title: 'Vingadores: Ultimato',
      genre: 'Ação',
      rating: 5,
    },
    {
      id: 4,
      title: 'Até Que a Sorte Nos Separe',
      genre: 'Comédia',
      rating: 3,
    },
    {
      id: 5,
      title: 'The Last: Naruto O Filme',
      genre: 'Animação',
      rating: 4,
    },
  ]);

  const [newMovie, setNewMovie] = useState<Movie>({
    id: 0,
    title: '',
    genre: '',
    rating: 0,
  });

  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const validateMovie = () => {
    return (
      newMovie.title.trim() !== '' &&
      newMovie.genre.trim() !== '' &&
      newMovie.rating >= 0 &&
      newMovie.rating <= 5
    );
  };

  const addMovie = () => {
    if (validateMovie()) {
      setMovies((prevMovies) => [
        ...prevMovies,
        { ...newMovie, id: Date.now() },
      ]);
      setNewMovie({ id: 0, title: '', genre: '', rating: 0 });
    }
  };

  const addToWatchlist = (movie: Movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prevWatchlist) => prevWatchlist.filter((movie) => movie.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Lista de Filmes</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Título do Filme"
          style={styles.input}
          onChangeText={(text) => setNewMovie({ ...newMovie, title: text })}
          value={newMovie.title}
        />
        <TextInput
          placeholder="Gênero"
          style={styles.input}
          onChangeText={(text) => setNewMovie({ ...newMovie, genre: text })}
          value={newMovie.genre}
        />
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Avaliacao: </Text>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setNewMovie({ ...newMovie, rating: star })}
            >
              <FontAwesome
                name={star <= newMovie.rating ? 'star' : 'star-o'}
                size={24}
                color={star <= newMovie.rating ? 'gold' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addMovie}
          activeOpacity={0.7}
        >
          <Text style={styles.addButtonText}>Adicionar Filme</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeader}>Lista de Filmes:</Text>
      {movies.length === 0 ? (
        <Text style={styles.noMoviesText}>Nenhum filme na lista.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieGenre}>Genero: {item.genre}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Avaliacao: </Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                      key={star}
                      name={star <= item.rating ? 'star' : 'star-o'}
                      size={20}
                      color={star <= item.rating ? 'gold' : 'gray'}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.addToWatchlistButton}
                onPress={() => addToWatchlist(item)}
                activeOpacity={0.7}
              >
                <Text style={styles.addToWatchlistButtonText}>Assistir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Text style={styles.subHeader}>Lista de Filmes para Assistir:</Text>
      {watchlist.length === 0 ? (
        <Text style={styles.noMoviesText}>Nenhum filme na lista de assistidos.</Text>
      ) : (
        <FlatList
          data={watchlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.movieGenre}>Genero: {item.genre}</Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingLabel}>Avaliacao: </Text>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                      key={star}
                      name={star <= item.rating ? 'star' : 'star-o'}
                      size={20}
                      color={star <= item.rating ? 'gold' : 'gray'}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeFromWatchlistButton}
                onPress={() => removeFromWatchlist(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.removeFromWatchlistButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 20,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noMoviesText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
  movieItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  movieInfoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieGenre: {
    fontSize: 14,
    marginTop: 5,
  },
    deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
    deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
    addToWatchlistButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addToWatchlistButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeFromWatchlistButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  removeFromWatchlistButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});