export default function RecipeCard({ title, ingredients, imageUrl }) {
  return (
    <div className="recipe-card">
      <img alt={title} className="recipe-card__image" src={imageUrl}></img>
      <div className="recipe-card__content">
        <h3 className="recipe-card__title">{title}</h3>
        <ul className="recipe-card__list">
          {ingredients.map((ing) => (
            <li className="recipe-card__item" key={ing.id}>
              {ing.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
