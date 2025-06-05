FROM golang:1.21-bullseye

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

ENV CGO_ENABLED=1
RUN apt-get update && apt-get install -y gcc
RUN go build -o main .

EXPOSE 8001

CMD ["./main"] 