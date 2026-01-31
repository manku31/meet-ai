import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface AvatarOptions {
  seed: string;
  variant: "botttsNeutral" | "initials";
}

export function generateAvatarUri({ seed, variant }: AvatarOptions) {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed: seed,
    });
  } else {
    avatar = createAvatar(initials, { seed, fontWeight: 400, fontSize: 42 });
  }

  return avatar.toDataUri();
}
