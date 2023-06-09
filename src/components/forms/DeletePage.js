import { useParams, useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import useGetOneRecipe from "../../hooks/useGetOneRecipe";
import { useAuthContext } from "../../contexts/AuthContext";
import Loading from "../loading/Loading";
import { recipeServiceFactory } from "../../services/recipeService";

const DeletePage = () => {
    const { recipeId } = useParams();
    const { token } = useAuthContext();
    const {  oneRecipe, loading }= useGetOneRecipe(recipeId);
    const recipeService = recipeServiceFactory(token);
    const { deleteRecipeFromState } = useDataContext()
    const navigate = useNavigate()
    
    if(loading){
        return <Loading/>;
    };

    const onDeleteClik = async (recipeId) => {
        
        await recipeService.deleteRecipe(recipeId);
        
        deleteRecipeFromState(recipeId);

        navigate('/catalog');
    }

    const onClose = () => {
        navigate(`/catalog/${recipeId}`);
    }


    return (
        <section id="delete" className="deleteRecipe">
            <fieldset>
                <legend className="deleteRecipe__legend">Delete Recipe</legend>
                <p>Are you shure that you want to delete {oneRecipe.title} recipe?</p>

                <div className="login-buttons">
                    <button className="delete__btn  button" type="submit" onClick={() => onDeleteClik(oneRecipe._id)}>Delete</button>
                    <button className="close__btn  button" type="button" onClick={onClose}>Cancel</button>
                </div>
            </fieldset>
        </section>
    );
};

export default DeletePage;