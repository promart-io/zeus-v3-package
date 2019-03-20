# Docker descriptor for Zeus
# License - http://www.eclipse.org/legal/epl-v10.html
ARG DIRIGIBLE_VERSION=latest

FROM maven:alpine
COPY / .
RUN mvn clean install -DskipTests=true

FROM dirigiblelabs/dirigible-base-platform-keycloak:$DIRIGIBLE_VERSION 
COPY --from=0 zeus/modules/accounts/target/zeus-accounts-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/applications/target/zeus-applications-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/client-kubernetes/target/zeus-client-kubernetes-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/core/target/zeus-core-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/code/target/zeus-code-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/data/target/zeus-data-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/deployer/target/zeus-deployer-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib
COPY --from=0 zeus/modules/templates/target/zeus-templates-0.0.1-SNAPSHOT.jar $CATALINA_HOME/webapps/ROOT/WEB-INF/lib

EXPOSE 8080
CMD ["catalina.sh", "run"]
