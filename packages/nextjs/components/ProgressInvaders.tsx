import { InvaderCard } from "./InvaderCard";
import { InvaderCardCaptured } from "./InvaderCardCaptured";

type ProgressInvadersProps = {
  challengeId: string;
  solved: boolean;
  timestamp?: number;
};

export function ProgressInvaders({ challenges }: { challenges: ProgressInvadersProps[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {challenges.map(challenge => {
          if (challenge.solved) {
            return (
              <InvaderCardCaptured
                key={challenge.challengeId}
                challengeId={Number(challenge.challengeId)}
                timestamp={challenge.timestamp}
              />
            );
          }
          return <InvaderCard key={challenge.challengeId} challengeId={Number(challenge.challengeId)} />;
        })}
      </div>
    </div>
  );
}
