import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- Add this
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from '@material-tailwind/react';

function Recipe() {
  
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openRecipes, setOpenRecipes] = useState(false);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openRecipeDetail, setOpenRecipeDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const params = useParams(); // <-- Get category from URL
  const navigate = useNavigate();
  

   
  // Fetch categories on mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          'https://www.themealdb.com/api/json/v1/1/categories.php'
        );
        setCategories(response.data.categories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  // If URL has category param, open dialog for that category
  useEffect(() => {
    if (categories.length && params.category) {
      const found = categories.find(
        (cat) => cat.strCategory.toLowerCase() === params.category.toLowerCase()
      );
      if (found) {
        setSelectedCategory(found);
        setOpenRecipes(true);
      } else {
        setSelectedCategory(null);
        setOpenRecipes(false);
      }
    }
  }, [categories, params.category]);

  // Fetch recipes for selected category
  useEffect(() => {
    if (selectedCategory) {
      const getRecipes = async () => {
        setRecipesLoading(true);
        try {
          const response = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory.strCategory}`
          );
          if (response.data.meals) {
            const recipeDetails = await Promise.all(
              response.data.meals.slice(0, 12).map((meal) =>
                axios
                  .get(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
                  )
                  .then((res) => res.data.meals[0])
              )
            );
            setRecipes(recipeDetails);
          } else {
            setRecipes([]);
          }
        } catch (err) {
          setError(err);
        } finally {
          setRecipesLoading(false);
        }
      };
      getRecipes();
    }
  }, [selectedCategory]);

  // When closing dialog, remove category from URL
  const handleCloseRecipes = () => {
    setOpenRecipes(false);
    setRecipes([]);
    setSelectedCategory(null);
    if (params.category) {
      navigate('/recipe');
    }
  };

  // Open recipe detail dialog
  const handleOpenRecipeDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setOpenRecipeDetail(true);
  };

  const handleCloseRecipeDetail = () => {
    setOpenRecipeDetail(false);
    setSelectedRecipe(null);
  };

  const renderCategories = () => {
    const filteredCategories = categories.filter((category) =>
      category.strCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="container mx-auto p-4">
        <div className="mb-8 w-full md:w-1/2 lg:w-1/3 mx-auto">
          <Input
            label="Search for a recipe category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            color="blue"
          />
        </div>
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredCategories.map((category) => (
              <Card
                key={category.idCategory}
                className="w-full max-w-sm bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-blue-100 hover:shadow-2xl transition transform hover:scale-105 duration-300"
              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={category.strCategoryThumb}
                    alt={category.strCategory}
                    className="h-48 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-white/80 px-3 py-1 rounded-full text-xs font-semibold text-blue-700 shadow">
                    {category.strCategory}
                  </div>
                </div>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2 font-bold">
                    {category.strCategory}
                  </Typography>
                  <Typography color="blue-gray" className="text-sm">
                    {category.strCategoryDescription &&
                    category.strCategoryDescription.length > 100 ? (
                      <ReadMore text={category.strCategoryDescription} maxLength={50} />
                    ) : (
                      category.strCategoryDescription || 'No description available.'
                    )}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex">
                  <Button
                    size="sm"
                    color="blue"
                    onClick={() => {
                      navigate(`/recipe/${category.strCategory.toLowerCase()}`);
                      setSelectedCategory(category);
                      setOpenRecipes(true);
                    }}
                    className="flex items-center gap-2 rounded-full px-6 cursor-pointer"
                  >
                    See Recipes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Typography color="blue-gray" className="text-center">
            No categories found matching your search.
          </Typography>
        )}
      </div>
    );
  };

  const renderRecipesDialog = () => (
    <Dialog open={openRecipes} handler={handleCloseRecipes} size="xl">
      <DialogHeader className="bg-blue-500 text-white rounded-t-xl">
        Recipes for {selectedCategory?.strCategory}
      </DialogHeader>
      <DialogBody>
        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipesLoading ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} footerAlign="center" />)
            ) : (
              recipes.map((recipe) => (
                <Card
  key={recipe.idMeal}
  className="w-full max-w-sm bg-white/30 backdrop-blur-md shadow-xl rounded-2xl border border-blue-100 hover:shadow-2xl transition transform hover:scale-105 duration-300"
  onClick={() => handleOpenRecipeDetail(recipe)}
>
  <div className="relative overflow-hidden rounded-t-2xl">
    <img
      src={recipe.strMealThumb}
      alt={recipe.strMeal}
      className="h-40 w-full object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-110"
    />
  </div>
  <CardBody>
    <Typography
      variant="h6"
      color="blue-gray"
      className="mb-2 font-semibold text-center"
    >
      {recipe.strMeal}
    </Typography>
  </CardBody>
  <CardFooter className="pt-0 flex justify-center">
    <Button
      size="sm"
      color="blue"
      onClick={(e) => {
        e.stopPropagation();
        handleOpenRecipeDetail(recipe);
      }}
      className="rounded-full px-5"
    >
      View Details
    </Button>
  </CardFooter>
</Card>
              ))
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleCloseRecipes} className="rounded-full">
          Close
        </Button>
      </DialogFooter>
      {selectedRecipe && renderRecipeDetailDialog()}
    </Dialog>
  );

  // Recipe detail dialog with video and instructions
  const renderRecipeDetailDialog = () => (
    <Dialog open={openRecipeDetail} handler={handleCloseRecipeDetail} size="lg">
      <DialogHeader className="bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-t-xl">
        {selectedRecipe.strMeal}
      </DialogHeader>
      <DialogBody>
        <div className="flex flex-col md:flex-row gap-6 max-h-[70vh] overflow-y-auto pr-2">
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            className="w-full md:w-1/2 h-full object-cover rounded-xl shadow"
          />
          <div className="flex-1">
            <Typography variant="h6" className="mb-2 text-blue-700">
              Instructions
            </Typography>
            <Typography className="mb-4 text-gray-700 text-sm whitespace-pre-line">
              {selectedRecipe.strInstructions}
            </Typography>
            <Typography variant="h6" className="mb-2 text-blue-700">
              Ingredients
            </Typography>
            <ul className="list-disc list-inside text-gray-700 mb-4 text-sm">
              {Array.from({ length: 20 })
                .map((_, i) => ({
                  ingredient: selectedRecipe[`strIngredient${i + 1}`],
                  measure: selectedRecipe[`strMeasure${i + 1}`],
                }))
                .filter((item) => item.ingredient && item.ingredient.trim())
                .map((item, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{item.ingredient}</span>
                    {item.measure ? ` - ${item.measure}` : ''}
                  </li>
                ))}
            </ul>
            {selectedRecipe.strYoutube && (
              <div className="mt-4">
                <Typography variant="h6" className="mb-2 text-blue-700">
                  Video Tutorial
                </Typography>
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedRecipe.strYoutube.split('v=')[1]}`}
                    title="Recipe Video"
                    allowFullScreen
                    className="w-full h-64"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogBody>
      <DialogFooter>
        <Button color="blue" onClick={handleCloseRecipeDetail} className="rounded-full">
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 12 }).map((_, index) => <SkeletonLoader key={index} />)}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-center text-red-600 mt-10">Error: {error.message}</div>;

  return (
    <>
      {renderCategories()}
      {selectedCategory && renderRecipesDialog()}
    </>
  );
}

export default Recipe;

export const ReadMore = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      {isExpanded ? (
        <Typography>{text}</Typography>
      ) : (
        <Typography>
          {text.slice(0, maxLength)}...
        </Typography>
      )}
      <Button size="sm" color="gray" onClick={toggleExpanded} className="mt-2 rounded-full">
        {isExpanded ? 'Read Less' : 'Read More'}
      </Button>
    </div>
  );
};

export const SkeletonLoader = ({ footerAlign = 'start' }) => (
  <Card className="w-full max-w-sm animate-pulse shadow-none bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-100">
    <div className="h-48 bg-gray-200 w-full rounded-t-2xl"></div>
    <CardBody>
      <div className="h-6 bg-gray-200 w-3/4 mb-3 rounded"></div>
      <div className="h-4 bg-gray-200 w-full mb-1 rounded"></div>
      <div className="h-4 bg-gray-200 w-5/6 mb-1 rounded"></div>
      <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
    </CardBody>
    <CardFooter className={`pt-0 flex ${footerAlign === 'center' ? 'justify-center' : ''}`}>
      <div className="bg-gray-200 h-8 w-28 rounded-full"></div>
    </CardFooter>
  </Card>
);