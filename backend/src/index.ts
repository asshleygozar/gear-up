import app from "#app.ts";
import { env } from "../env.ts";

app.listen(env.PORT, () => {
    console.log(`Server running on PORT ${env.PORT}`);
    console.log(`Environment: ${env.APP_STAGE}`);
});
