import Image from "next/image";
import Link from "next/link";
import { FlagIcon } from "./FlagIcon";
import clsx from "clsx";
import { getFlagBgColor, getFlagColor } from "~~/utils/flagColor";
import { CHALLENGE_NAMES } from "~~/utils/getChallenges";

const invaderClass = "mx-auto w-10 h-10 md:w-12 md:h-12";

export function InvaderCard({ challengeId }: { challengeId: number }) {
  return (
    <div className="card flex items-center justify-center border border-gray-800 bg-gray-950 rounded-md aspect-square">
      <Link href={`/challenge/${challengeId}`}>
        <div className="invader mx-auto relative w-10 text-center">
          <Image
            width={96}
            height={96}
            className={invaderClass}
            src={`/invader-${challengeId}.svg`}
            alt={`Invader ${challengeId}`}
          />
          <div className="absolute top-0 -right-7">
            <div className="relative rotate-12">
              <FlagIcon className={clsx("w-8 h-8", getFlagColor(challengeId))} />
              <span className="absolute top-[5px] left-[6px] m-0 p-0 leading-none text-xs text-white font-semibold [text-shadow:_1px_1px_1px_rgb(0_0_0_/_40%)]">
                {challengeId}
              </span>
            </div>
          </div>
        </div>
        <p className="m-0 px-2 text-sm antialiased">{CHALLENGE_NAMES[challengeId.toString()]}</p>
        <div className={clsx("dot", getFlagBgColor(challengeId))}></div>
      </Link>
    </div>
  );
}
