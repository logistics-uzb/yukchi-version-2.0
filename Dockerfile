# syntax=docker/dockerfile:1.6

# ---------- Build stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

ARG VITE_BASE_URL
ARG VITE_POSTHOG_PROJECT_TOKEN
ARG VITE_POSTHOG_HOST
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_POSTHOG_PROJECT_TOKEN=${VITE_POSTHOG_PROJECT_TOKEN}
ENV VITE_POSTHOG_HOST=${VITE_POSTHOG_HOST}

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime stage ----------
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
