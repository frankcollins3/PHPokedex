/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ALLpokemonURL: `https://pokeapi.co/api/v2/pokemon?limit=300`
  }
}

module.exports = nextConfig

// module.exports = {
//   env: {
//     tv: 'tv dinner',
//     dvd: 'dvd dinner'
//   },
// }
