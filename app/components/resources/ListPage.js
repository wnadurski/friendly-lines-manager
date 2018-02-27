import React from "react"
import {Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title} from "native-base"

export const ListPage = ({onBack, title, children, onAdd}) =>
    <Container>
        <Header>
            <Left>
                <Button transparent onPress={onBack}>
                    <Icon name='arrow-back'/>
                </Button>
            </Left>
            <Body>
                <Title>{title}</Title>
            </Body>
            <Right>
                <Button transparent onPress={onAdd}><Text>Dodaj</Text></Button>
            </Right>
        </Header>

        <Content keyboardShouldPersistTaps="handled">
            {children}
        </Content>
    </Container>

