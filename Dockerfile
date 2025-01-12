# Build Container Image

FROM node:alpine AS cobuilder

WORKDIR /crypto-orbit

RUN apk add --no-cache git npm && \
    git clone https://github.com/dan7467/crypto-orbit . && \
    npm i && \
    npm run build

# Crypto Orbit Container image

FROM node:alpine

LABEL org.opencontainers.image.authors="Dan BD" \
        org.opencontainers.image.description="Container image for Crypto Orbit"

WORKDIR /crypto-orbit

# Install only runtime dependencies (production mode)
COPY --from=cobuilder /crypto-orbit/package.json /crypto-orbit/package-lock.json ./
RUN npm ci --production

# Copy the built application
COPY --from=cobuilder /crypto-orbit/dist ./dist
COPY --from=cobuilder /crypto-orbit/src/ ./src

# Create a non-root user for better security
RUN adduser -g "Some User" -s /usr/sbin/nologin -D -H someguest

USER someguest

EXPOSE 3000

CMD ["node", "dist/main"]
