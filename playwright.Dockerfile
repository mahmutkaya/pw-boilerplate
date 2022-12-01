FROM mcr.microsoft.com/playwright:v1.20.0-focal

ENV PRODUCT_DIR=/opt/skynet
ENV PROJECTS_DIR=/opt/skynet/src/projects

RUN mkdir ${PRODUCT_DIR}
COPY . ${PRODUCT_DIR}
WORKDIR ${PRODUCT_DIR}

RUN rm -Rf ./.devcontainer
RUN rm -Rf ./.github
RUN rm -Rf ./.vscode
RUN rm -Rf ./.git
RUN touch .env
RUN cp .env.dist .env

RUN mkdir -p ${PROJECTS_DIR}
WORKDIR ${PROJECTS_DIR}

COPY ./testplan ./qa-automation-skynet
WORKDIR ${PRODUCT_DIR}

RUN rm -Rf ./testplan
RUN npm install
