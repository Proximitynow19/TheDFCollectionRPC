import RPC from "discord-rpc";
import fetch from "node-fetch";

module.exports = function () {
  const rpc = new RPC.Client({ transport: "ipc" });

  rpc.on("ready", async () => {
    console.log("Rich Presence Running");
    await Update();
    setInterval(Update, 10000);
  });

  async function Update() {
    const data = JSON.parse(
      await (
        await fetch(`https://thedfcollectionapi.herokuapp.com/${rpc.user.id}`, {
          method: "GET",
        })
      ).json()
    );

    if (data) {
      if (data.state) {
        if (data.large) {
          await rpc.setActivity({
            details: data.details,
            state: data.state,
            startTimestamp: data.lastonline,
            largeImageKey: data.large,
            largeImageText: data.details,
          });
        } else {
          await rpc.setActivity({
            details: data.details,
            state: data.state,
            startTimestamp: data.lastonline,
            largeImageKey: "main",
            largeImageText: "The DF Collection",
          });
        }
      } else {
        if (data.large) {
          await rpc.setActivity({
            details: data.details,
            startTimestamp: data.lastonline,
            largeImageKey: data.large,
            largeImageText: data.details,
          });
        } else {
          await rpc.setActivity({
            details: data.details,
            startTimestamp: data.lastonline,
            largeImageKey: "main",
            largeImageText: "The DF Collection",
          });
        }
      }
    }
  }

  rpc.login({ clientId: "748730623102812210" });
};
