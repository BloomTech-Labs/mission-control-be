# ======================================================
# Get's node image with the production deps
# ======================================================
FROM node:12-alpine AS deps
WORKDIR /app
COPY package.json npm-shrinkwrap.json ./
RUN npm install --production --silent


# ======================================================
# Builds the final image from the previous two
# ======================================================
FROM node:12-alpine
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules/
COPY ./src/ ./
CMD [ "node", "index.js" ]
EXPOSE 8000
