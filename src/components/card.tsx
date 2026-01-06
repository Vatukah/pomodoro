interface CardInfo {
  head: string;
  body: string;
}

interface CardProps {
  info: CardInfo;
}

export default function Card({ info }: CardProps) {
  return (
    <div className="cardWrapper">
      <p className="card_head">{info.head}</p>
      <p className="card_body">{info.body}</p>
    </div>
  );
}
