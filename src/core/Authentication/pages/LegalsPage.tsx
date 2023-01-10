import { Button, Checkbox, Col, Row, Typography, notification } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Styles from './styles/LoginPage.style';
import { AuthContext } from '..';

export const legalPagesObject = {
  returns_and_replacements: {
    title: 'Widerrufsbelehrung',
    link: '/legals/returns_and_replacements',
  },
  term_conditions: {
    title: 'AGB',
    link: '/legals/term_conditions',
  },
  legal_disclosure: {
    title: 'Impressum',
    link: '/legals/legal_disclosure',
  },
  privacy_policy: {
    title: 'Datenschutz',
    link: '/legals/privacy_policy',
  },
  return_forms: {
    title: 'Partner Vertrag',
    link: '/legals/return_forms',
  },
  delivery_policy: {
    title: 'Versandarten',
    link: '/legals/delivery_policy',
  },
  payment_policy: {
    title: 'Zahlungen',
    link: '/legals/payment_policy',
  },
  use_cookies: {
    title: 'Cookies',
    link: '/legals/use_cookies',
  },
};

export default function LegalsPage(): ReactElement {
  const navigate = useNavigate();
  const [isPending, setPending] = useState<boolean>(false);
  const { legals, onAssignLegals, tempToken } = useContext(AuthContext);

  const [controlledLegals, setControllerLegals] = useState<{ key: string; accepted: boolean }[]>([]);

  useEffect(() => {
    if (legals && legals.length > 0) {
      setControllerLegals(legals.map((legal) => ({ key: legal, accepted: false })));
    } else {
      navigate('/auth/login/partner');
    }
  }, [legals]);

  const handleLegalCheck = (checked: boolean, key: string) => {
    setControllerLegals((prev) =>
      prev.map((legal) => (key === legal.key ? { ...legal, accepted: checked } : legal)),
    );
  };

  const handleAssignLegals = () => {
    setPending(true);
    onAssignLegals()
      .then((data) => {
        if (data) {
          setPending(false);
          navigate('/admin/dashboard');
          notification.success({
            message: 'Logged In Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        }
      })
      .catch(() => setPending(false));
  };

  return (
    <Styles.MainContainer justify="center" align="middle">
      <Col lg={12} md={16} xs={22}>
        <Row className="header" style={{ marginBottom: 32 }}>
          <Typography.Title level={3}>Legals</Typography.Title>
          {<Typography.Text>For logging in and seeing dashboard You Should Accept Legals</Typography.Text>}
        </Row>

        {controlledLegals.map((legal, key) => (
          <Row key={`legal-${key}`} style={{ marginTop: 8 }}>
            <Col xs={24}>
              <Checkbox
                checked={legal.accepted}
                onChange={(e) => handleLegalCheck(e.target.checked, legal.key)}
              >
                Bitte nehmen Sie unsere
                <Link target={'_blank'} to={`${legalPagesObject[legal.key].link}?token=${tempToken}`}>
                  {legalPagesObject[legal.key].title}
                </Link>
              </Checkbox>
            </Col>
          </Row>
        ))}

        <Row style={{ marginTop: 32 }}>
          <Button
            block
            size="large"
            type="primary"
            htmlType="button"
            loading={isPending}
            onClick={handleAssignLegals}
            disabled={controlledLegals.some((legal) => !legal.accepted)}
          >
            Accept Terms And Login
          </Button>
        </Row>
      </Col>
    </Styles.MainContainer>
  );
}
