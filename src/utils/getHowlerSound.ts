import { Howl } from "howler";

export default function getHowlSound(soundName: string, props?: IHowlProperties): Howl {
    let soundSource = `./sounds/${soundName}`;
    let howlProps: IHowlProperties = { src: soundSource, ...props };

    return new Howl(howlProps);
}
