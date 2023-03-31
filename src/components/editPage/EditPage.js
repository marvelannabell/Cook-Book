import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useService } from "../../hooks/useService";
import { AuthContext } from "../../contexts/AuthContext";
import { recipeServiceFactory } from "../../services/recipeService";
import { getOne } from '../../services/recipeService'
import DataContext from "../../contexts/DataContext";

const EditFormKeys = {
    Id: '_id',
    Title: 'title',
    PrepareTime: 'prepare',
    CookTime: 'cook',
    Type: 'type',
    Dificulty: 'dificulty',
    Serves: 'serves',
    Author: 'author',
    Description: 'description',
    Ingredients: 'ingredients',
    Image: 'imageUrl',
    Method: 'method',
    Category: 'category',
};

const EditPage = () => {
    const { firstName, lastName, onFormClose } = useContext(AuthContext);
    const { onEditSubmit } = useContext(DataContext)
    const { recipeId } = useParams();
    const recipeService = useService(recipeServiceFactory);

    const { formValues, onChangeHandler, onSubmit, changeValues } = useForm({
        [EditFormKeys.Id]: '',
        [EditFormKeys.Title]: '',
        [EditFormKeys.Author]: `${firstName} ${lastName}`,
        [EditFormKeys.Description]: '',
        [EditFormKeys.Ingredients]: '',
        [EditFormKeys.Image]: '',
        [EditFormKeys.Method]: '',
        [EditFormKeys.CookTime]:'',
        [EditFormKeys.Dificulty]:'',
        [EditFormKeys.PrepareTime]:'',
        [EditFormKeys.Serves]:'',
        [EditFormKeys.Category]:'',
    }, onEditSubmit);

    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(result => {
                const ingredientsForEdit = result.ingredients.join('||');
                const methodForEdit = result.method.join('||');
                result.ingredients = ingredientsForEdit;
                result.method = methodForEdit;
                console.log(result);
                changeValues(result);
            });
    }, [recipeId]);

    return (
        <section id="edit-page" className="edit">
            <form id="edit-form" action="#" method="" onSubmit={onSubmit}>
                <fieldset>
                    <legend>Edit Recipe</legend>
                    <p className="field">
                        <label htmlFor="title">Recipe title:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="title"
                                placeholder="Recipe title:"
                                name={EditFormKeys.Title}
                                value={formValues[EditFormKeys.Title]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="title">Created By:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="createdBy"
                                placeholder="Created By:"
                                name={EditFormKeys.Author}
                                value={`${firstName} ${lastName}`}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="type">Category</label>
                        <span className="input">
                            <select id="type" name={EditFormKeys.Category} value={formValues.category} onChange={onChangeHandler}>
                                <option value="main-dishes">Main Dishes</option>
                                <option value="salads">Salads</option>
                                <option value="soups">Soups</option>
                                <option value="soups">Drinks</option>
                                <option value="dessert">Desstert</option>
                                <option value="quick">Quiqk Recipes</option>
                                <option value="healthy">Healthy Recipes</option>
                            </select>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="dificulty">Dificulty Level:</label>
                        <span className="input">
                            <select id="dificulty" name={EditFormKeys.Dificulty} value={formValues.dificulty} onChange={onChangeHandler}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="prepare">Prepare time:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="prepare"
                                placeholder="Prepare time:"
                                name={EditFormKeys.PrepareTime}
                                value={formValues[EditFormKeys.PrepareTime]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="cook">Cook time:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="cook"
                                placeholder="Cook time:"
                                name={EditFormKeys.CookTime}
                                value={formValues[EditFormKeys.CookTime]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="serves">Serves:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="serves"
                                placeholder="Serves:"
                                name={EditFormKeys.Serves}
                                value={formValues[EditFormKeys.Serves]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description:</label>
                        <span className="input">
                            <textarea
                                id="description"
                                placeholder="Description:"
                                name={EditFormKeys.Description}
                                value={formValues[EditFormKeys.Description]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Ingredients: use <span>"||"</span> to separate ingredients!</label>
                        <span className="input">
                            <textarea
                                id="description"
                                placeholder="Example:sugar||butter||fruits||..."
                                name={EditFormKeys.Ingredients}
                                value={formValues[EditFormKeys.Ingredients]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image:</label>
                        <span className="input">
                            <input
                                type="text"
                                id="image"
                                placeholder="Image:"
                                name={EditFormKeys.Image}
                                value={formValues[EditFormKeys.Image]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Method: use <span>"||"</span> to separate each method step!</label>
                        <span className="input">
                            <textarea
                                id="method"
                                placeholder="Example: Step 1||Step 2||Step 3||..."
                                name={EditFormKeys.Method}
                                value={formValues[EditFormKeys.Method]}
                                onChange={onChangeHandler}
                            />
                        </span>
                    </p>
                    <div className="addRecipe-buttons">
                        <input
                            className="button submit"
                            type="submit"
                            defaultValue="Add Recipe"
                        />
                        <button className="button close" onClick={onFormClose}>Close</button>
                    </div>
                </fieldset>
            </form>
        </section>
    )
};

export default EditPage;