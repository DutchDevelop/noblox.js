// Includes
const http = require('../util/http.js').func

// Args
exports.required = ['gameId']
exports.optional = ['timeFrame', 'jar']

// Docs
/**
 * 🔐 Gets recent Robux revenue summary for a game; shows pending Robux.
 * @category Game
 * @alias getGameRevenueSummary
 * @param {number} gameId - The game id to get Robux summary for.
 * @param {("Daily" | "Weekly" | "Monthly" | "Yearly")=} [timeFrame="Month"] - The time frame to get for.
 * @returns {Promise<RevenueSummaryResponse>}
 * @example const noblox = require("noblox.js")
 * // Login using your cookie
 * let revenueSummary = await noblox.getGameRevenueSummary(9997719, "Year")
**/

// Define
function getGameRevenueSummary (game, timeFrame, jar) {
  return http({
    url: `//develop.roblox.com/v1/places/${game}/stats/Revenue?granularity=${timeFrame}`,
    options: {
      jar: jar,
      resolveWithFullResponse: true
    }
  })
    .then(({ statusCode, body }) => {
      const { errors } = JSON.parse(body)
      if (statusCode === 200) {
        return JSON.parse(body)
      } else if (statusCode === 400) {
        throw new Error(`${errors[0].message} | game: ${game}, timeFrame: ${timeFrame}`)
      } else if (statusCode === 401) {
        throw new Error(`${errors[0].message} (Are you logged in?) | game: ${game}, timeFrame: ${timeFrame}`)
      } else if (statusCode === 403) {
        throw new Error('Insufficient permissions')
      } else {
        throw new Error(`An unknown error occurred with getGameRevenueSummary() | [${statusCode}] game: ${game}, timeFrame: ${timeFrame}`)
      }
    })
}

exports.func = function ({gameId, timeFrame = 'Daily', jar }) {
    return getGameRevenueSummary(gameId, timeFrame, jar)
}