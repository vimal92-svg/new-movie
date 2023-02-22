import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from "react";
import { StyleSheet,Text,View, ScrollView,FlatList} from 'react-native';
import COLORS from "../constants/Colors";
import GenreCard from "../components/GenreCard";
import MovieCard from "../components/MovieCard";
import ItemSeparator from"../components/ItemSeparator";
import { AppRegistry } from 'react-native';
import {
  getNowPlayingMovies,getUpcomingMovies,getAllGenres,getPopularMovies,
 
} from "../services/MovieService";
const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = ({ navigation }) => {
  const [activeGenre,setActiveGenre] =useState("All")
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [UpcomingMovies, setUpcomingMovies] = useState({});
  const [PopularMovies, setPopularMovies] = useState({});
  const [LatestMovies, setLatestMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: "All" }]);
  
  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovies(movieResponse.data)
    );
    getUpcomingMovies().then((movieResponse) =>
    setUpcomingMovies(movieResponse.data)
  );
  getPopularMovies().then((movieResponse) =>
 setPopularMovies(movieResponse.data)
);
  getAllGenres().then((genreResponse) =>
  setGenres([...genres,...genreResponse.data.genres])
  );
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" translucent={false}backgroundColor={COLORS.BASIC_BACKGROUND} />
      <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Now Showing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View style={styles.genreListContainer}>
      <FlatList data={genres} 
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item)=> item.id.toString()}
      ItemSeparatorComponent= {() =><ItemSeparator width={20}/>}
      ListHeaderComponent={() => <ItemSeparator width={20} />}
      ListFooterComponent={() => <ItemSeparator width={20} />}
      renderItem={({item}) => (
      <GenreCard 
      genreName={item.name} 
      active={item.name === activeGenre ? true : false}
      onPress={setActiveGenre}
      />
      )}
      />
        </View>
        <View>
          <FlatList 
          
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item)=> item.id.toString()}
          ItemSeparatorComponent= {() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item}) => ( <MovieCard  title={item.title}
          language={item.original_language}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          heartLess={false}
          onPress={() => navigation.navigate("movie",{movieId:item.id})}
          />
         )}
          />
         
          </View>
          <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Coming Soon</Text>
      <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      
      <View>
          <FlatList 
          
          data={UpcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item)=> item.id.toString()}
          ItemSeparatorComponent= {() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item}) => (
           <MovieCard  title={item.title}
          language={item.original_language}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}
          size={0.6}  
          onPress={() => navigation.navigate("movie",{movieId:item.id})}
          />
          )}
         />
          </View>
          <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Popular Movies</Text>
     
      </View>
          <View>
          <FlatList 
          
          data={PopularMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item)=> item.id.toString()}
          ItemSeparatorComponent= {() =><ItemSeparator width={20}/>}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({item}) => ( <MovieCard  title={item.title}
          language={item.original_language}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          poster={item.poster_path}

          size={0.6} 
          onPress={() => navigation.navigate("movie",{movieId:item.id})}
          />
         )}
          />
         
          </View>
          
      

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  
  },
  headerContainer:{

    flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  
  },
  headerTitle:{
    
    fontSize: 28,
    
  },
  headerSubTitle:{
    fontSize: 13,
    color: COLORS.ACTIVE,
    
  },
  genreListContainer: {
    paddingVertical: 10,
  },
});
export default HomeScreen;