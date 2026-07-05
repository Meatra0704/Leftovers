export default function RecipeCard({ title, ingredients, imageUrl }) {
  return (
    <div className="card">
      <img alt="food" src={imageUrl}></img>
      <h3>{title}</h3>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing.id}>{ing.name}</li>
        ))}
      </ul>
    </div>
  );
}
