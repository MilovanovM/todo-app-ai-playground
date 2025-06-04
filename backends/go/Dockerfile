FROM golang:1.21-bullseye

WORKDIR /app

# Add a non-root user
RUN useradd -m appuser

COPY go.mod ./
RUN go mod download

COPY . .

# Enable CGO and build
ENV CGO_ENABLED=1
RUN go build -o main .

# Create data directory and set permissions
RUN mkdir -p /app/data && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

EXPOSE 8002

CMD ["./main"] 