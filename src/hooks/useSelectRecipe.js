import { getOne } from "../services/recipeService";
import { useService } from "./useService";
import { useState,useEffect } from "react";
import { recipeServiceFactory } from "../services/recipeService";



const useSelectRecipe=(recipeId)=>{
    
    const [selectedRecipe, setSelectedRecipe] = useState({});
    const recipeService = useService(recipeServiceFactory)
    
    
    useEffect(() => {
        recipeService.getOne(recipeId)
            .then(result => {
                // console.log(`result ${result}`);
                setSelectedRecipe(result);
            })
    }, [recipeId]);

    return selectedRecipe
}
export default useSelectRecipe;