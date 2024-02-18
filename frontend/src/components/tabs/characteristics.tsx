type  CharacteristicsProps = {
  artikul: string;
  type: string;
  strings: string;
}

export function Characteristics({ artikul, type, strings }: CharacteristicsProps): JSX.Element {
  return (
    <div className="tabs__content" id="characteristics">
      <table className="tabs__table">
        <tbody>
          <tr className="tabs__table-row">
            <td className="tabs__title">Артикул:</td>
            <td className="tabs__value">{artikul}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Тип:</td>
            <td className="tabs__value">{type}</td>
          </tr>
          <tr className="tabs__table-row">
            <td className="tabs__title">Количество струн:</td>
            <td className="tabs__value">{strings} струнная</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
