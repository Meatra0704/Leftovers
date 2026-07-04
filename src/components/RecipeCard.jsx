function RecipeCard({ titles, ingredient, imageUrl }) { 
  return (
    <>
      <div className="card">
        <img alt="food" src={imageUrl}></img>
        <h3>{titles}</h3>
      </div>
    </>
  );
}