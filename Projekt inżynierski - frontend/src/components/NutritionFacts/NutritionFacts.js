import "./NutritionFacts.scss";

export default function NutritionFacts({
  calories,
  fat,
  carbs,
  protein,
  servings,
}) {
  console.log(servings);
  // const calories = 10;
  // const fat = 100;
  // const carbs = 102;
  // const protein = 200;
  return (
    <div className="nutrition-container">
      <p className="label-title">Wartości odżywcze</p>
      <div className="nutrition-container-table">
        <div className="table">
          <div class="table-header">
            <div class="header__item"></div>
            <div class="header__item">Kalorie</div>
            <div class="header__item">Tłuszcz</div>
            <div class="header__item">Węglowodany</div>
            <div class="header__item">Białko</div>
          </div>
          <div class="table-content">
            <div class="table-row">
              <div class="table-data">w sumie</div>
              <div class="table-data">{calories}</div>
              <div class="table-data">{fat}g</div>
              <div class="table-data">{carbs}g</div>
              <div class="table-data">{protein}g </div>
            </div>
          </div>
          <div class="table-content">
            <div class="table-row">
              <div class="table-data">na porcję</div>
              <div class="table-data">{calories / servings}</div>
              <div class="table-data">{fat / servings}g</div>
              <div class="table-data">{carbs / servings}g</div>
              <div class="table-data">{protein / servings}g </div>
            </div>
          </div>
        </div>
      </div>
      <span className="nutrition-info">
        Informacje o wartości odżywczej są obliczane przy użyciu bazy danych
        składników i należy traktować szacunkowo. W przypadkach, gdy wiele
        składników podane są alternatywy, pierwsza wymieniona jest obliczona dla
        wartości odżywczej. Dodatki i opcjonalne składniki nie są uwzględnione.
      </span>
    </div>
  );
}
